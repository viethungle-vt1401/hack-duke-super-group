import geojson
from geopy.distance import geodesic

# Step 1: Load the GeoJSON Data
with open('api/', 'r') as file:
    geojson_data = geojson.load(file)

# Step 2: Create a Graph
graph = {}

for feature in geojson_data['features']:
    if feature['geometry']['type'] == 'LineString':
        coordinates = feature['geometry']['coordinates']
        for i in range(len(coordinates) - 1):
            coord1 = tuple(coordinates[i])
            coord2 = tuple(coordinates[i + 1])
            weight = geodesic(coord1, coord2).meters
            graph.setdefault(coord1, []).append((coord2, weight))
            graph.setdefault(coord2, []).append((coord1, weight))

# Step 3: Find the Nearest Nodes
def find_nearest_node(graph, coord):
    return min(graph.keys(), key=lambda x: geodesic(coord, x).meters)

# Step 4: Implement Dijkstra's Algorithm
def dijkstra(graph, start, end):
    queue = []
    visited = {node: (float('inf'), None) for node in graph}
    visited[start] = (0, None)
    
    queue.append(start)
    
    while queue:
        current_node = min(queue, key=lambda node: visited[node][0])
        queue.remove(current_node)
        
        if current_node == end:
            path = []
            while current_node:
                path.insert(0, current_node)
                current_node = visited[current_node][1]
            return path
        
        for neighbor, weight in graph[current_node]:
            distance = visited[current_node][0] + weight
            if distance < visited[neighbor][0]:
                visited[neighbor] = (distance, current_node)
                queue.append(neighbor)

# Define your start and end coordinates
start_coord = (35.9992, -78.9382) # Replace with your start coordinate
end_coord = (36.0010, -78.9380) # Replace with your end coordinate

# Find the nearest nodes to your start and end coordinates
start_node = find_nearest_node(graph, start_coord)
end_node = find_nearest_node(graph, end_coord)

# Find the shortest path using Dijkstra's algorithm
path = dijkstra(graph, start_node, end_node)

# Print the path
if path:
    for i, coord in enumerate(path):
        print(f'Step {i}: {coord}')
else:
    print('Path not found')
