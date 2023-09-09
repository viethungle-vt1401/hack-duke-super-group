import geojson
from geopy.distance import geodesic

# Step 1: Load the GeoJSON Data
with open('walkingpaths.geojson', 'r') as file:
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
start_x = input()
start_y = input()
end_x = input()
end_y = input()
start_coord = (start_x, start_y)
end_coord = (end_x, end_y)

# start_coord = (-78.9280652, 36.0077519)  # Replace with your start coordinate
# end_coord = (-78.9358661, 36.0055298)  # Replace with your end coordinate

# Find the nearest nodes to your start and end coordinates
start_node = find_nearest_node(graph, start_coord)
end_node = find_nearest_node(graph, end_coord)

# Find the shortest path using Dijkstra's algorithm
path = dijkstra(graph, start_node, end_node)
path_c = [node for node in path]

# Print the path
count = False
coord2 = (0, 0)
distance = 0

if path_c:
    pathD = list(range(len(path_c)))
    distance = geodesic(end_node, path_c[len(path_c)-1]).meters
    for i in range(len(path_c)-1, 0, -1):
        distance += geodesic(path_c[i], path_c[i-1]).meters
        print(path_c[i])
        pathD[i] = distance
    pathD[0] = geodesic(path_c[0], start_node).meters + distance

    print(f'Distance from current location to the end of the path = {pathD[0]} meters')
else:
    print('Path not found')

# if path:
#     for i, coord in enumerate(path):
#         print(f'Step {i}: {coord}')
#         if i == 0:
#             count = True
#             coord2 = coord
#             continue
#         distance += geodesic(coord, coord2).meters
#         coord2 = coord

#     print(f'Distance = {distance} meters')
# else:
#     print('Path not found')


# def update(path: list[{int, int}], current, start, end):