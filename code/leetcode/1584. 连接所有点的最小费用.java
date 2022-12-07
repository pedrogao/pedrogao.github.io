import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

class Solution9 {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        var dsu = new DisjointSetUnion(n);
        List<Edge> edges = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                edges.add(new Edge(dist(points, i, j), i, j));
            }
        }
        Collections.sort(edges, (edge1, edge2) -> edge1.len - edge2.len);
        int ret = 0, num = 1;
        for (var edge : edges) {
            int len = edge.len, x = edge.x, y = edge.y;
            if (dsu.unionSet(x, y)) {
                ret += len;
                num++;
                if (num == n) {
                    break;
                }
            }
        }

        return ret;
    }

    private int dist(int[][] points, int i, int j) {
        return Math.abs(points[i][0] - points[j][0]) +
                Math.abs(points[i][1] - points[j][1]);
    }

    static class DisjointSetUnion {
        int[] f;
        int[] rank;
        int n;

        public DisjointSetUnion(int n) {
            this.n = n;
            this.rank = new int[n];
            Arrays.fill(this.rank, 1);
            this.f = new int[n];
            for (int i = 0; i < n; i++) {
                this.f[i] = i;
            }
        }

        public int find(int x) {
            // 秀啊，递归用三目运算符来实现
            return f[x] == x ? x : (f[x] = find(f[x]));
        }

        public boolean unionSet(int x, int y) {
            int fx = find(x), fy = find(y);
            if (fx == fy) {
                return false;
            }
            if (rank[fx] < rank[fy]) {
                int temp = fx;
                fx = fy;
                fy = temp;
            }
            rank[fx] += rank[fy];
            f[fy] = fx;
            return true;
        }
    }

    static class Edge {
        int len, x, y; // 边的长度，x坐标，y坐标

        public Edge(int len, int x, int y) {
            this.len = len;
            this.x = x;
            this.y = y;
        }
    }

    public static void main(String[] args) {
        int[][] points = new int[][] {
            {0,0},{2,2},{3,10},{5,2},{7,0},
        };
        var minCostConnectPoints = new Solution9().minCostConnectPoints(points);
        System.out.println(minCostConnectPoints);
    }
}