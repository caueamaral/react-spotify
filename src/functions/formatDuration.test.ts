import formatDuration from './formatDuration'

test('extracts "5:06" from "306560"', () => {
    expect(formatDuration(306560)).toEqual('5:06')
})