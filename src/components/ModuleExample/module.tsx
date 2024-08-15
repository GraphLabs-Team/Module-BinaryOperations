import { Graph } from "../GraphLibrary/Graph";
import { GraphGenerator } from "../GraphLibrary/GraphGenerator";
import { GraphController } from "../GraphLibrary/GraphController";
import { Template } from "../Template";
import TaskTimer from "../TaskTimer/index";
import { ToolBar } from "../Toolbar/ToolBar";
import Matrix from "../MatrixLibrary/matrix";

export class ModuleExample<T1, T2> extends Template<T1, T2> {
    
    protected override task(){
        let operations: string[] = ["сеодинения графов", 
        "объединения графов", "пересечения графов"];
        let i = Math.floor(Math.random() * 3);
        let operationString = operations[i];
        
        return () => <p>Провести операцию {operationString}</p>
    }

    protected task_matrix() {
      let n1_vertex = 2;
      let n2_vertex = 7;
      let task_graph: Graph<T1, T2> = GraphGenerator.random2components(n1_vertex, n2_vertex, 0.3);
      let matrix_1: number[][] = Array(n1_vertex).fill([]).map(() => Array(n1_vertex).fill(0))
      let matrix_2: number[][] = Array(n2_vertex).fill([]).map(() => Array(n2_vertex).fill(0))
      task_graph.edges.forEach((edge) => {
        let source_id = Number(edge.source.id)
        let target_id = Number(edge.target.id)
        if (source_id < n1_vertex){
          matrix_1[target_id][source_id] = 1
          matrix_1[source_id][target_id] = 1
        }
        else{
          matrix_2[target_id - n1_vertex][source_id - n1_vertex] = 1
          matrix_2[source_id - n1_vertex][target_id - n1_vertex] = 1
        }
      })
      let names_1: string[] = Array(n1_vertex).fill("0").map((val, i) => i + 1 + "")
      const properMatrix_1 = matrix_1.map((row) => row.map((item) => item + ""));
      let names_2: string[] = Array(n2_vertex).fill("0").map((val, i) => i - 1 + n1_vertex + "")
      const properMatrix_2 = matrix_2.map((row) => row.map((item) => item + ""));
      let operations: string[] = ["сеодинения графов", "объединения графов", "пересечения графов"];
      let i = Math.floor(Math.random() * 3);
      let operationString = operations[i];
      return () => (
        <div>
          <p>Провести операцию {operationString}</p>        
          <Matrix
            id="matrix1"
            data_array={properMatrix_1}
            is_mutable={false}
            disableCellClick
            col_names={names_1}
            row_names={names_1}
          />
          <p></p>   
          <Matrix
            id="matrix2"
            data_array={properMatrix_2}
            is_mutable={false}
            disableCellClick
            col_names={names_2}
            row_names={names_2}
          />
      </div>
      );
    }

    public override render() {
        const variant = Math.random() < 0.5 ? 1 : 2;
        let Task: any = this.task();
        if (variant == 1) {
          Task = this.task_matrix();
        }
        return (
          <div className={"App"} id="wrap">
            {
              <div>
                <div className={"MainRow"}>
                  {this.isGraphModule() && (
                    <GraphController
                      id={"cy1"}
                      className="GraphCell"
                      graph={this.state.graph}
                      visualization_policy={this.visualizing_policy}
                      is_nodeid_visible={this.isNodeNameVisible()}
                      is_weights_visible={this.isEdgeWeightVisible()}
                    />
                  )}
                  {!this.isGraphModule() && (
                    <div id={"matrix"} className={"GraphCell"}>
                      {/* <MatrixController matrix={this.generateMatrix()} /> */}
                    </div>
                  )}
                  <div
                    id={"drtfghbjk"}
                    className={`TaskCell ${
                      variant === 1 ? "TaskCell-full-height" : ""
                    }`}
                  >
                    <p>Задание</p>
                    <Task />
                  </div>
                  {variant === 2 && (
                    <div id={"drtfghbjk"} className={"TaskCellGraph"}>
                      <GraphController
                        id={"cy2"}
                        className="TaskCellGraph"
                        graph={this.state.task_graph}
                        visualization_policy={this.visualizing_policy}
                        is_nodeid_visible={this.isNodeNameVisible()}
                        is_weights_visible={this.isEdgeWeightVisible()}
                        ignoreToolbar
                      />
                    </div>
                  )}
                  <div className={"ToolCell"}>
                    <ToolBar
                      next_stage={this.nextStage}
                      base_button={true}
                      base_button_message={this.helpMessage()}
                      graph_manipulations_button={this.isGraphModified()}
                      graph_coloring_buttons={this.isGraphRepainted()}
                      graph_adj_coloring_buttons={this.isGraphAdjRepainted()}
                      graph_naming_buttons={this.isGraphNodeRenamed()}
                      graph_weight_buttons={this.isGraphReweight()}
                      change_visualization_policy_buttons={this.isVisualizingPolicyChangeble()}
                    />
                  </div>
                </div>
                <div className={"LeftBottom"}>
                  <TaskTimer timeSeconds={100} onTimerExpire={this.nextStage} />
                </div>
              </div>
            }
          </div>
        );
    }

    protected override helpMessage() {
      const text0 = "Рассмотрим графы G1=<V1, U1> и G2=<V2, U2>\n"
      const text1 = "1. Объединением графов G1 и G2 называется граф\nG =<V, U> такой, что\nV =V1 ∪ V2\nU =U1 ∪ U2\n";
      const text2 = "2. Соединением графов G1 и G2 называется граф\nG =<V, U> такой, что\nV =V1 ∪ V2\nU =U1 ∪ U2 ∪ (V1\\V2)x(V2\\V1)\n"
      const text3 = "3. Пересечением графов G1 и G2 называется граф\nG =<V, U> такой, что\nV =V1 ∩ V2\nU =U1 ∩ U2\n"
      const text4 = "4. Для добавления вершины нажмите кнопку \"Добавить вершину\"\n"
      const text5 = "5. Для удалить вершины выберите удаляемую вершину и нажмите кнопку \"Удалить вершину\"\n"
      const text6 = "6. Для добавления ребра выберите 2 вершины зажав \"ctrl\", нажмите кнопку \"Добавить ребро\"\n"
      const text7 = "7. Для удаления ребра выберите удаляемое ребро, нажмите кнопку \"Удалить ребро\"\n"
      const text8 = "8. Для изменения названия вершины используйте кнопу \"Переименовать вершину\"\n"
      const text9 = "9. Для изменения цвета вершины или ребра выберите цвет и вершину, которые хотите перекрасить, нажмите кнопку перекрасить вершину/ребро"
      const text10 = "Удачи!"
      return text0 + text1 + text2 + text3 + text4 + text5 + text6 + text7 + text8 + text9 + text10;
    }
    
    protected  override nextStage() {
        console.log("next stage");
    }

    protected override generateTaskGraph() {
        let task_graph: Graph<T1, T2> = GraphGenerator.random2components(2, 3, 0.3);
        return task_graph;
    }    
    
    protected override generateGraph(){
        let graph: Graph<T1, T2> = GraphGenerator.random(0, 0.3)
        return graph
    }

    protected override isGraphModified(){
        return true
    }
    
    protected override isGraphRepainted(){
        return true
    }
    
    protected override isGraphNodeRenamed(){
        return true
    }
    
    protected override isGraphReweight(){
        return false
    }

    protected isVisualizingPolicyChangeble(){
        return false
    }
    
    protected override isNodeNameVisible(){
        return true
    }

    protected override isEdgeWeightVisible(){
        return false
    }

}