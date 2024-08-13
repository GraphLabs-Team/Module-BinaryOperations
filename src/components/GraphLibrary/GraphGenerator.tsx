import { Graph } from './Graph';
import { Node } from './Node';
import { Edge } from './Edge';


export class GraphGenerator {
    
    public static random<T1, T2>(n_vertex: number, p_connected: number, selfconn: boolean = false){
        let graph: Graph<T1, T2> = new Graph()
        for (let i = 0; i < n_vertex; i++){
            let node: Node<T1> = new Node(i.toString(), i.toString(), "")
            graph.addNode(node)
        }
        let edges_ids: number[] = [0]
        graph.nodes.forEach(node1 => {
            graph.nodes.forEach(node2 => {
                if (node1.id !== node2.id) {
                    let prob = Math.random()
                    if (p_connected > prob){
                        let index = 1
                        if (edges_ids && edges_ids.at(-1)){
                            index = edges_ids[edges_ids.length - 1] + 1
                        }
                        edges_ids.push(index)
                        let edge: Edge<T1, T2> = new Edge(index.toString(), node1, node2, "", "0")
                        graph.addEdge(edge)
                    }
                }
            });
        });
        return graph
    }

    public static random2components<T1, T2>(n1_vertex: number, n2_vertex: number, p_connected: number, selfconn: boolean = false) {
        let graph: Graph<T1, T2> = new Graph()
        let node_arr1: number[] = []
        let node_arr2: number[] = []
        for (let i = 0; i < n1_vertex; i++) {
            let node: Node<T1> = new Node(i.toString(), i.toString(), "")
            graph.addNode(node)
            node_arr1.push(0)
        }
        for (let i = n1_vertex; i < n1_vertex + n2_vertex; i++) {
            let node: Node<T1> = new Node(i.toString(), i.toString(), "")
            graph.addNode(node);
            node_arr2.push(0)
        }
        let edges_ids: number[] = [0]
        graph.nodes.forEach(node1 => {
            graph.nodes.forEach(node2 => {
                if (node1.id !== node2.id &&
                    ((Number(node1.id) < n1_vertex && Number(node2.id) < n1_vertex) ||
                        (Number(node1.id) >= n1_vertex && Number(node2.id) >= n1_vertex))) {
                    let prob = Math.random()
                    if (p_connected > prob) {
                        let index = 1
                        if (edges_ids && edges_ids.at(-1)) {
                            index = edges_ids[edges_ids.length - 1] + 1
                        }
                        edges_ids.push(index)
                        let edge: Edge<T1, T2> = new Edge(index.toString(), node1, node2, "", "0")
                        graph.addEdge(edge)
                        if (node1.id < n1_vertex.toString()) {
                            node_arr1[Number(node1.id)] += 1
                            node_arr1[Number(node2.id)] += 1
                        } else {
                            node_arr2[Number(node1.id) - n1_vertex] += 1
                            node_arr2[Number(node2.id) - n1_vertex] += 1
                        }
                    }
                }
            });
        });
        for (let i = 0; i < n1_vertex; i++) {
            if (node_arr1[i] === 0) {
                let index = 1
                if (edges_ids && edges_ids.at(-1)) {
                    index = edges_ids[edges_ids.length - 1] + 1
                }
                edges_ids.push(index)
                let node2_id = Math.floor(Math.random() * (n1_vertex - 1))
                if (node2_id === i) {
                    if (i === n1_vertex - 1) {
                        node2_id -= 1
                    } else {
                        node2_id += 1
                    }
                }
                let cur_node: Node<T1> = graph.getNode(i.toString()) as Node<T1>
                let node2: Node<T1> = graph.getNode(node2_id.toString()) as Node<T1>
                let edge: Edge<T1, T2> = new Edge(index.toString(), cur_node, node2, "", "0")
                graph.addEdge(edge)
            }
        }
        for (let i = n1_vertex; i < n1_vertex + n2_vertex; i++) {
            if (node_arr2[i - n1_vertex] === 0) {
                let index = 1
                if (edges_ids && edges_ids.at(-1)) {
                    index = edges_ids[edges_ids.length - 1] + 1
                }
                edges_ids.push(index)
                let node2_id = Math.floor(Math.random() * (n2_vertex - 1)) + n1_vertex
                if (node2_id === i) {
                    if (i === n1_vertex + n2_vertex - 1) {
                        node2_id -= 1
                    } else {
                        node2_id += 1
                    }
                }
                let cur_node: Node<T1> = graph.getNode(i.toString()) as Node<T1>
                let node2: Node<T1> = graph.getNode(node2_id.toString()) as Node<T1>
                let edge: Edge<T1, T2> = new Edge(index.toString(), cur_node, node2, "", "0")
                graph.addEdge(edge)
            }
        }
        return graph
    }
}







