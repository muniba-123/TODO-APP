import { useState, useEffect } from "react";
import axios from "axios";
import DotIcon from "../assets/icons/DotIcon";
import ListIcon from "../assets/icons/ListIcon";
import ChevronIcon from "../assets/icons/ChevronIcon";
import CheckCircleIcon from "../assets/icons/CheckCircleIcon";
import PlusIcon from "../assets/icons/PlusIcon";

export default function Home(props) {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/task");
      setTasks(response.data?.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post("/api/task", {
        title: newTaskTitle,
      });
      setNewTaskTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/task/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTask = (taskId) => {
    setExpandedTaskId(taskId === expandedTaskId ? null : taskId);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="inner flex flex-col w-2/6">
        <div className="profile-pic"></div>
        <div className="text-block">
          <input
            type="text"
            placeholder="Add new task"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-1/2 mr-2"
          />
          <button onClick={handleAddTask} className="plus-icon">
            <PlusIcon width="30px" />
          </button>
        </div>
        <div className="title">
          Your Todos
          <ListIcon className="left-icon" />
          <ChevronIcon className="right-icon" />
        </div>
        {
          <div className="list">
            {tasks.length === 0 ? (
              <div className="no-tasks-block">No tasks today</div>
            ) : (
              <>
                {tasks?.map((task) => (
                  <div
                    key={task._id}
                    className="item cursor-pointer"
                    onClick={() => toggleTask(task._id)}
                  >
                    <div className="top">
                      <h2 className="">{task.title}</h2>
                      <CheckCircleIcon className="left-icon" />
                      <DotIcon className="right-icon" />
                    </div>
                    {expandedTaskId === task._id && (
                      <div className="details">
                        <div>
                          <span className="font-bold">Created Date: </span>
                          {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                        {task.completed && (
                          <div>
                            <span className="font-bold">Completed Date: </span>
                            {new Date(task.updatedAt).toLocaleDateString()}
                          </div>
                        )}
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="px-4 py-2 rounded hover:bg-red-600 delete-btn mt-2"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        }
      </div>
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const { data } = await axios.get(url);
//   return {
//     props: {
//       tasks: data.data,
//     },
//   };
// };
