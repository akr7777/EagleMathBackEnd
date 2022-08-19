"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialsAPI = exports.categoriesAPI = void 0;
exports.categoriesAPI = [
    { id: 1, parentId: null, label: "Матeматика", items: [] },
    { id: 2, parentId: 1, label: "алгебра", items: [] },
    { id: 3, parentId: 1, label: "rеометрия", items: [] },
    { id: 4, parentId: 3, label: "круги", items: [] },
    { id: '5', parentId: 3, label: "квадраты", items: [] },
    {
        id: 6, parentId: null, label: "Физика",
        items: [
            { id: '9', parentId: 4, label: "phisics материал", }
        ]
    },
];
exports.materialsAPI = [
    { id: '7', parentId: 4, label: "круги материал", content: 'круги материал описание' },
    { id: 8, parentId: '5', label: "квадраты материал", content: 'квадраты материал описание' },
];
