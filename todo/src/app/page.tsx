"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { clear } from "console";
import Link from "next/link";
import { MouseEvent, ChangeEvent, FormEvent, useState } from "react";

type Task = {
  name: string;
  completed: boolean;
};

const Home = () => {
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completed, setCompleted] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  const changeFilter = (e: any) => {
    setFilter(e.target.name);
  };

  const handleToggle = (index: number) => {
    setTasks((prevState) => {
      const newState = prevState.map((task, i) => {
        if (i === index) {
          if (task.completed) {
            setCompleted(completed - 1);
          } else {
            setCompleted(completed + 1);
          }
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      return newState;
    });
  };

  const removeCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
    setCompleted(0);
  };
  const removeOne = (index: number) => {
    if (tasks[index].completed) {
      setCompleted(completed - 1);
    }
    setTasks(tasks.filter((tasks, i) => i !== index));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasks([...tasks, { name: newTask, completed: false }]);
    setNewTask("");
  };
  return (
    <main className="py-16">
      <Card className="w-96 mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl">To-Do List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex gap-2 mb-5">
            <Input
              placeholder="Add a new task..."
              value={newTask}
              onChange={handleChange}
            />
            <Button
              className="font-normal bg-blue-600 hover:bg-blue-600"
              type="submit"
            >
              Add
            </Button>
          </form>
          <div className="flex gap-2">
            <Button
              name="all"
              onClick={changeFilter}
              className={`text-xs font-normal px-3 py-1
                ${
                  filter === "all"
                    ? "text-white bg-blue-600 hover:text-white hover:bg-blue-600"
                    : "text-black bg-gray-200 hover:text-black hover:bg-gray-200"
                }`}
            >
              All
            </Button>
            <Button
              name="active"
              onClick={changeFilter}
              className={`text-xs font-normal px-3 py-1
                ${
                  filter === "active"
                    ? "text-white bg-blue-600 hover:text-white hover:bg-blue-600"
                    : "text-black bg-gray-200 hover:text-black hover:bg-gray-200"
                }`}
            >
              Active
            </Button>
            <Button
              name="completed"
              onClick={changeFilter}
              className={`text-xs font-normal px-3 py-1
                ${
                  filter === "completed"
                    ? "text-white bg-blue-600 hover:text-white hover:bg-blue-600"
                    : "text-black bg-gray-200 hover:text-black hover:bg-gray-200"
                }`}
            >
              Completed
            </Button>
          </div>
          <div className="my-6">
            {tasks.length === 0 ? (
              <p className="text-center text-md text-gray-600">
                No tasks yet. Add one above!
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  {tasks.map((task, index) => {
                    if (
                      filter !== "all" &&
                      ((filter === "active" && task.completed) ||
                        (filter === "completed" && !task.completed))
                    ) {
                      return null;
                    }
                    return (
                      <div
                        className="flex justify-between bg-blue-200 bg-opacity-10 rounded-lg
                                hover:bg-gray-100 cursor-pointer px-3 py-4"
                        key={index}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={task.completed}
                            onClick={() => handleToggle(index)}
                          />
                          <p className={`${task.completed && "line-through"}`}>
                            {task.name}
                          </p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="bg-red-50 hover:bg-red-50 shadow-none text-red-400 px-3">
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirm Deletion
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this task?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => removeOne(index)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    );
                  })}
                </div>
                {((filter === "active" && completed === tasks.length) ||
                  (filter === "completed" && completed === 0)) && (
                  <p className="text-center text-md text-gray-600 mb-4">
                    No tasks yet. Add one above!
                  </p>
                )}
                <hr />
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    {completed} of {tasks.length} tasks completed
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="bg-transparent hover:bg-transparent shadow-none
                                      text-red-400 hover:text-red-600 px-0"
                      >
                        Clear Completed
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to clear all completed tasks?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={removeCompleted}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-1 text-sm text-gray-400">
          <p>By</p>
          <Link href={"https://github.com/BataaB"} className="text-blue-500">
            Batkhuleg Bazarragchaa
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Home;
