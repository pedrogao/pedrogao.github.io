import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution16 {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start, int end) {
        // 最短路径
        var g = new Graph(n);
        for (int i = 0; i < edges.length; i++) {
            g.addEdge(edges[i][0], edges[i][1], succProb[i]);
        }
        var distTo = compute(start, g);
        if (distTo[end] == Integer.MAX_VALUE)
            return 0;
        return distTo[end];
    }

    private double[] compute(int k, Graph g) {
        double[] distTo = new double[g.V];
        Arrays.fill(distTo, -1); // 达到其他节点的概率为-1，现在需要找到最大值
        distTo[k] = 1; // 到达自己的概率为1
        PriorityQueue<State> q = new PriorityQueue<>((o1, o2) -> {
            return Double.compare(o1.dist, o2.dist);
        });
        q.offer(new State(k, 1)); // 到达自己的概率为1

        while (!q.isEmpty()) {
            var cur = q.poll();

            if (cur.dist < distTo[cur.id]) // 概率小的
                continue; // 无需更新

            for (var node : g.adj(cur.id)) {
                // 达到 node 的距离可以变小
                var d = node.weight * distTo[cur.id];
                if (distTo[node.id] < d) {
                    distTo[node.id] = d;
                    q.offer(new State(node.id, d));
                }
            }
        }
        return distTo;
    }

    static class Node {
        int id; // id
        double weight; // 权重

        public Node(int id, double weight) {
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

        public void addEdge(int start, int end, double weight) {
            adj.get(start).add(new Node(end, weight));
            adj.get(end).add(new Node(start, weight));
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
        double dist;

        public State(int id, double dist) {
            this.id = id;
            this.dist = dist;
        }
    }

    public static void main(String[] args) {
        int[][] edges = new int[][] { { 0, 1 }, { 1, 2 }, { 0, 2 } };
        double[] succProb = new double[] { 0.5, 0.5, 0.2 };
        double maxProbability = new Solution16().maxProbability(3, edges, succProb, 0, 2);
        System.out.println(maxProbability);
    }
}
