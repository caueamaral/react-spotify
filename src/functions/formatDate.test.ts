import formatDate from './formatDate'

test('extracts "28/02/2020" from "2020-02-28"', () => {
    expect(formatDate('2020-02-28')).toEqual('28/02/2020')
})