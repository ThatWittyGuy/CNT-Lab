import java.util.*;

public class DijkstraRouting {
    static final int INF = Integer.MAX_VALUE;
    static final int V = 7;
    static String[] vertexNames = {"A", "B", "C", "D", "E", "F", "G"};

    public static void dijkstra(int[][] graph, int source) {
        int[] dist = new int[V];
        boolean[] visited = new boolean[V];
        String[] path = new String[V];

        Arrays.fill(dist, INF);
        Arrays.fill(visited, false);
        for (int i = 0; i < V; i++) {
            path[i] = vertexNames[source];
        }

        System.out.println("Initial Values");
        System.out.println("Visited: " + Arrays.toString(visited));
        System.out.println("Distances: " + Arrays.toString(dist));
        System.out.println("Path: " + Arrays.toString(path) + "\n");

        dist[source] = 0;

        for (int count = 0; count < V - 1; count++) {
            int u = minDistance(dist, visited);
            visited[u] = true;

            System.out.println("Step " + (count + 1) + ":");
            System.out.println("Visited: " + Arrays.toString(visited));
            System.out.println("Distances: " + Arrays.toString(dist));

            for (int v = 0; v < V; v++) {
                if (!visited[v] && graph[u][v] != 0 && dist[u] != INF && dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                    path[v] = path[u] + " -> " + vertexNames[v];
                }
            }

            System.out.println("Update distance and path for neighboring vertices");
            System.out.println("Distances: " + Arrays.toString(dist));
            System.out.println("Path: " + Arrays.toString(path) + "\n");
        }

        System.out.println("\nVertex\tDistance\tPath");
        for (int i = 0; i < V; i++) {
            if (i != source) {
                System.out.println(vertexNames[source] + " -> " + vertexNames[i] + "\t" + dist[i] + "\t\t" + path[i]);
            }
        }
    }

    public static int minDistance(int[] dist, boolean[] visited) {
        int min = INF, minIndex = -1;
        for (int v = 0; v < V; v++) {
            if (!visited[v] && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    }

    public static void main(String[] args) {
        int[][] graph = {
            {0, 2, 5, 0, 0, 0, 0},
            {2, 0, 1, 2, 0, 0, 0},
            {5, 1, 0, 3, 1, 4, 0},
            {0, 2, 3, 0, 2, 0, 3},
            {0, 0, 1, 2, 0, 0, 5},
            {0, 0, 4, 0, 0, 0, 2},
            {0, 0, 0, 3, 5, 2, 0}
        };
        dijkstra(graph, 0);
    }
}
