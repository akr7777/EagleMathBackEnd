export type CategoryType = {
    id: number | string,
    parentId: number | null | string,
    label: string,
    items: Array<CategoryType>// | Array<MaterialType>,//if sub-categories exists
}

export const categoriesAPI: CategoryType[] = [
    {id: 1, parentId: null, label: "Матeматика", items: []},
    {id: 2, parentId: 1, label: "алгебра", items: []},
    {id: 3, parentId: 1, label: "rеометрия", items: []},
    {id: 4, parentId: 3, label: "круги", items: []},
    {id: '5', parentId: 3, label: "квадраты", items: []},
    {id: 6, parentId: null, label: "Физика", items: []},
    ]