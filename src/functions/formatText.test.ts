import formatText from './formatText'

test('extracts "linkin-park" from "Linkin Park"', () => {
    expect(formatText('Linkin Park')).toEqual('linkin-park')
})