
export type MaterialType = {
    id: number | string,
    parentId: number | null | string,
    label: string,
    //items: Array<MaterialType>,//if sub-categories exists
    content?: string,
}
export type CategoryType = {
    id: number | string,
    parentId: number | null | string,
    label: string,
    items?: Array<CategoryType> | Array<MaterialType>,//if sub-categories exists
}

export const categoriesAPI: CategoryType[] = [
    {id: 1, parentId: null, label: "Матeматика", items: []},
    {id: 2, parentId: 1, label: "алгебра", items: []},
    {id: 3, parentId: 1, label: "rеометрия", items: []},
    {id: 4, parentId: 3, label: "круги", items: []},
    {id: '5', parentId: 3, label: "квадраты", items: []},
    {
        id: 6, parentId: null, label: "Физика",
        items:
            [
                {id: '9', parentId: 4, label: "phisics материал",}
            ]
    },
]
export const materialsAPI: MaterialType[] = [
    {id: '7', parentId: 4, label: "круги материал", content: 'круги материал описание'},
    {id: 8, parentId: '5', label: "квадраты материал", content: 'квадраты материал описание'},
]