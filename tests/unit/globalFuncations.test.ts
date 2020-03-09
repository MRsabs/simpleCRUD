import { getDay, getIdFromJwt, isDev, unixNow } from '../../src/global/functions';

test('should output id from JWT token', () => {
  const fakeRequest = {
    headers: {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjMyNTFlYTZhMTZiNzMyOTdhMjlkMCIsImlhdCI6MTU4MzU1NTg3OX0.KvVJNQC2jOG2LyJYK09zBUoKRrJq1sc0-1H7nPSZ1M0'
    }
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  expect(getIdFromJwt(fakeRequest)).toEqual('5e63251ea6a16b73297a29d0');
});

test('should output day from date', () => {
  expect(getDay(1583528400)).toEqual(7 - 1);
});

test('should check if node in development', () => {
  expect(isDev()).toBe(false);
});

test('should return args if node in development', () => {
  expect(isDev(1)).toEqual(1);
});
test('should return the current timestamp', () => {
  expect(unixNow()).toEqual(Math.floor(new Date().getTime() / 1000));
});
