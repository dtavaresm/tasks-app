import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;