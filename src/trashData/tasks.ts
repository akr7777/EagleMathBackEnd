export type TaskType = {
    id: number | string,
    parentId: number | null | string,
    label: string,
    items: Array<TaskType>,//if sub-categories exists
}

export const tasksAPI: TaskType[] = [
    {id: '7', parentId: 4, label: "Задача по кругам №1", items: []},
    {id: 8, parentId: '5', label: "Задача по квадратам №1", items: []},
    {id: '9', parentId: 6, label: "Задача по физике №1", items: []}
]