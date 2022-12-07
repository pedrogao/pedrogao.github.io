import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

public class Dijkstra {

    static class Node {
        int id; // id
        int weight; // 权重

        public Node(int id, int weight) {
            this.id = id;
            this.weight = weight;
        }

        public Node(int id) {
            this.id = id;
        }
    }

    static class Graph {
        private final int V; // 顶点个数 veterx number
        private int E; // 边的个数 edge number
        private List<List<Node>> adj; // 邻接表

        public Graph(int v) {
            this.V = v;
            this.E = 0;
            adj = new ArrayList<>(v);
            for (int i = 0; i < v; i++) {
                adj.add(new ArrayList<>());
            }
        }

        public void addEdge(int start, int end, int weight) {
            adj.get(start).add(new Node(end, weight));
            E++;
        }

        public Iterable<Node> adj(int v) {
            return adj.get(v);
        }

        public int E() {
            return E;
        }

        public int V() {
            return V;
        }
    }

    static class State {
        int id;
        int dist;

        public State(int id, int dist) {
            this.id = id;
            this.dist = dist;
        }
    }

    private static int[] dijkstra(int start, Graph graph) {
        int[] distTo = new int[graph.V];
        Arrays.fill(distTo, Integer.MAX_VALUE);
        distTo[start] = 0; // 到达自己为0

        PriorityQueue<State> q = new PriorityQueue<>((o1, o2) -> o1.dist - o2.dist);
        q.offer(new State(start, 0)); // 从自己开始
        while (!q.isEmpty()) {
            var cur = q.poll();
            var curId = cur.id;
            var curDist = cur.dist; // 当前最小距离

            // 如果正在走的路径比队列中的路径大，那么直接continue
            if (curDist > distTo[curId]) {
                continue;
            }

            // 重新计算最小的
            for (var node : graph.adj(curId)) {
                var nextId = node.id;
                var nextDist = node.weight + distTo[curId]; // 已有长度 + 当前长度
                if (distTo[nextId] > nextDist) { // 如果 nextDist 小，那么更新
                    distTo[nextId] = nextDist;
                    q.offer(new State(nextId, nextDist));
                }
            }
        }

        return distTo;
    }

    public static void main(String[] args) {
        int[][] times = new int[][] {
                { 2, 1, 1 }, { 2, 3, 1 }, { 3, 4, 1 }
        };
        int n = 4, k = 2;
        var g = new Graph(n);
        for (int[] time : times) {
            g.addEdge(time[0] - 1, time[1] - 1, time[2]);
        }
        var distTo = dijkstra(k - 1, g);
        System.out.println(Arrays.toString(distTo));
    }
}