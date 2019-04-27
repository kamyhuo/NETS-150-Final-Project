import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashMap;


public class MaximalCliquesWithoutPivot {

    HashMap<String, Vertex> graph = new HashMap<String, Vertex>();

    class Vertex implements Comparable<Vertex> {
        String id;
        int degree;
        ArrayList<Vertex> neighbors = new ArrayList<Vertex>();

        public String getID() {
            return id;
        }

        public void setID(String id) {
            this.id = id;
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

    // Reads Input 
    void readNextGraph(BufferedReader br) throws Exception  {
        try {
            //initGraph();
            String str;
            ArrayList<Vertex> currLineVertices = new ArrayList<Vertex>();
            while ((str = br.readLine()) != null) {
                currLineVertices.clear();
                String[] strArr = str.split(" ");
                for (int i = 0; i < strArr.length; i++) {
                    String u = strArr[i];

                    if (!(graph.containsKey(u))) {
                        Vertex U = new Vertex();
                        U.setID(u);
                        graph.put(u, U);
                        currLineVertices.add(U);
                    }
                }

                // Now, form edges between all vertices in line
                for (Vertex v : currLineVertices) {
                    for (Vertex u : currLineVertices) {
                        if (v != u) {
                            v.addNeighbor(u);
                        }
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    // Finds nbr of vertex i 
    ArrayList<Vertex> getNeighbors(Vertex v) {
        String i = v.getID();
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
    void Bron_Kerbosch(ArrayList<Vertex> R, ArrayList<Vertex> P,
                                   ArrayList<Vertex> X, String pre) {

        if ((P.size() == 0) && (X.size() == 0)) {
            printClique(R);
            return;
        }

        ArrayList<Vertex> P1 = new ArrayList<Vertex>(P);

        for (Vertex v : P) {
            R.add(v);
            Bron_Kerbosch(R, intersect(P1, getNeighbors(v)),
                    intersect(X, getNeighbors(v)), pre + " ");
            R.remove(v);
            P1.remove(v);
            X.add(v);
        }
    }

    void Bron_KerboschPivotExecute() {

        ArrayList<Vertex> X = new ArrayList<Vertex>();
        ArrayList<Vertex> R = new ArrayList<Vertex>();
        ArrayList<Vertex> P = new ArrayList<Vertex>(graph.values());
        Bron_Kerbosch(R, P, X, "");
    }

    void printClique(ArrayList<Vertex> R) {
        System.out.print("Maximal Clique : ");
        for (Vertex v : R) {
            System.out.print(" " + (v.getID()));
        }
        System.out.println();
    }

    public static void main(String[] args) {
        BufferedReader br = null;
        File file = new File("src/test.txt");
        try {
            br = new BufferedReader(new FileReader(file));
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
        MaximalCliquesWithoutPivot ff = new MaximalCliquesWithoutPivot();
        System.out.println("Max Cliques Without Pivot");
        try {
            ff.readNextGraph(br);
            ff.Bron_KerboschPivotExecute();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
} 