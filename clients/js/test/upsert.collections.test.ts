import { expect, test } from '@jest/globals';
import chroma from './initClient'
import { IDS, DOCUMENTS, EMBEDDINGS, METADATAS } from "./data";

test('it should return true on success', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection({ name: "test" });
    
    const upsert = await collection.upsert({ ids: IDS, embeddings: EMBEDDINGS, metadatas: METADATAS, documents: DOCUMENTS });
    expect(upsert).toBe(true)
    
    const count = await collection.count()
    expect(count).toBe(3)

})

test('it should upsert embeddings to a collection', async () => {
    await chroma.reset()
    const collection = await chroma.createCollection({ name: "test" });
    const ids = ['test1', 'test2']
    const embeddings = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    ]
    await collection.add({ ids, embeddings })
    const count = await collection.count()
    expect(count).toBe(2)

    const ids2 = ["test2", "test3"]
    const embeddings2 = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 15],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ]

    await collection.upsert({ ids: ids2, embeddings: embeddings2 })

    const count2 = await collection.count()
    expect(count2).toBe(3)
})
