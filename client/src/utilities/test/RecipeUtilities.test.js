import { getAllTags } from '../RecipesUtilities'

const expectExactTags = (expectedTags, tags) => {
  let disappearingTags = expectedTags
  tags.forEach((tag) => {
    expect(disappearingTags).toContain(tag)
    disappearingTags.splice(
      disappearingTags.findIndex((exp) => exp === tag),
      1
    )
  })
  expect(disappearingTags).toHaveLength(0)
}

describe('RecipeUtilities', () => {
  describe('getAllTags', () => {
    it('returns empty list when no recipes exist', () => {
      expect(getAllTags([])).toHaveLength(0)
    })

    it('grabs all tags', () => {
      const recipes = [
        { tags: ['TAG_1'] },
        { tags: ['TAG_2', 'TAG_3'] },
        { tags: ['TAG_4'] },
      ]

      const result = getAllTags(recipes)
      expect(result).toHaveLength(4)

      let expectedTags = ['TAG_1', 'TAG_2', 'TAG_3', 'TAG_4']
      expectExactTags(expectedTags, result)
    })

    it('handles duplicate tags', () => {
      const recipes = [
        { tags: ['TAG_1'] },
        { tags: ['TAG_2', 'TAG_1'] },
        { tags: ['TAG_2'] },
      ]

      const result = getAllTags(recipes)
      expect(result).toHaveLength(2)

      let expectedTags = ['TAG_1', 'TAG_2']
      expectExactTags(expectedTags, result)
    })
  })
})
