import formatArrayWithCommas from './formatArrayWithCommas'

test('extracts "rock, glam metal, hard rock" from ["rock", "glam metal", "hard rock"]', () => {
    expect(formatArrayWithCommas(['rock', 'glam metal', 'hard rock'])).toEqual('rock, glam metal, hard rock')
})