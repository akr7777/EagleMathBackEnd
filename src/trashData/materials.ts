export type MaterialType = {
    id: number | string,
    parentId: number | null | string,
    label: string,
    items: Array<MaterialType>,//if sub-categories exists
}

export const materialsAPI: MaterialType[] = [
    {id: '7', parentId: 4, label: "Материал по кругам №1", items: []},
    {id: 8, parentId: '5', label: "Материал по квадратам №1", items: []},
    {id: '9', parentId: 6, label: "Материал по физике №1", items: []}
]