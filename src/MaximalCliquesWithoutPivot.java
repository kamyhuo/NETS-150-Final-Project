import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;


public class MaximalCliquesWithoutPivot {

    int nodesCount;
    ArrayList<Vertex> graph = new ArrayList<Vertex>();

    class Vertex implements Comparable<Vertex> {
        int x;

        int degree;
        ArrayList<Vertex> neighbors = new ArrayList<Vertex>();

        public int getX() {
            return x;
        }

        public void setX(int x) {
            this.x = x;
        }

        public ArrayList<Vertex> getNeighbors() {
            return neighbors;
        }

        public void addNeighbor(Vertex y) {
            this.neighbors.add(y);
            if (!y.getNeighbors().contains(y)) {
                y.getNeighbors().add(this);
                y.degree++;
            }
            this.degree++;

        }

        @Override
        public int compareTo(Vertex o) {
            if (this.degree < o.degree) {
                return -1;
            }
            if (this.degree > o.degree) {
                return 1;
            }
            return 0;
        }
    }

    void initGraph() {
        graph.clear();
        for (int i = 0; i < nodesCount; i++) {
            Vertex V = new Vertex();
            V.setX(i);
            graph.add(V);
        }
    }

    int readTotalGraphCount(BufferedReader bufReader) throws Exception {

        return Integer.parseInt(bufReader.readLine());
    }

    // Reads Input 
    void readNextGraph(BufferedReader bufReader) throws Exception {
        try {
            nodesCount = Integer.parseInt(bufReader.readLine());
            int edgesCount = Integer.parseInt(bufReader.readLine());
            initGraph();

            for (int k = 0; k < edgesCount; k++) {
                String[] strArr = bufReader.readLine().split(" ");
                int u = Integer.parseInt(strArr[0]);
                int v = Integer.parseInt(strArr[1]);
                Vertex vertU = graph.get(u);
                Vertex vertV = graph.get(v);
                vertU.addNeighbor(vertV);

            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    // Finds nbr of vertex i 
    ArrayList<Vertex> getNbrs(Vertex v) {
        int i = v.getX();
        return graph.get(i).neighbors;
    }

    // Intersection of two sets 
    ArrayList<Vertex> intersect(ArrayList<Vertex> arlFirst,
                                ArrayList<Vertex> arlSecond) {
        ArrayList<Vertex> arlHold = new ArrayList<Vertex>(arlFirst);
        arlHold.retainAll(arlSecond);
        return arlHold;
    }

    // Version without a Pivot 
    void Bron_KerboschWithoutPivot(ArrayList<Vertex> R, ArrayList<Vertex> P,
                                   ArrayList<Vertex> X, String pre) {

        if ((P.size() == 0) && (X.size() == 0)) {
            printClique(R);
            return;
        }

        ArrayList<Vertex> P1 = new ArrayList<Vertex>(P);

        for (Vertex v : P) {
            R.add(v);
            Bron_KerboschWithoutPivot(R, intersect(P1, getNbrs(v)),
                    intersect(X, getNbrs(v)), pre + "\t");
            R.remove(v);
            P1.remove(v);
            X.add(v);
        }
    }

    void Bron_KerboschPivotExecute() {

        ArrayList<Vertex> X = new ArrayList<Vertex>();
        ArrayList<Vertex> R = new ArrayList<Vertex>();
        ArrayList<Vertex> P = new ArrayList<Vertex>(graph);
        Bron_KerboschWithoutPivot(R, P, X, "");
    }

    void printClique(ArrayList<Vertex> R) {
        System.out.print("Maximal Clique : ");
        for (Vertex v : R) {
            System.out.print(" " + (v.getX()));
        }
        System.out.println();
    }

    public static void main(String[] args) {
        BufferedReader bufReader = null;
        File file = new File("src/test.txt");
        try {
            bufReader = new BufferedReader(new FileReader(file));
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
        MaximalCliquesWithoutPivot ff = new MaximalCliquesWithoutPivot();
        System.out.println("Max Cliques Without Pivot");
        try {
            int totalGraphs = ff.readTotalGraphCount(bufReader);
            for (int i = 0; i < totalGraphs; i++) {
                System.out.println("************** Start Graph " + (i + 1)
                        + "******************************");
                ff.readNextGraph(bufReader);
                ff.Bron_KerboschPivotExecute();

            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Exiting : " + e);
        }
    }
} 