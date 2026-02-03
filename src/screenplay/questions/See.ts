import { Question } from '../core/types';
import { expect } from '@playwright/test';

export function Truthy<T>(): (value: T) => void {
  return (value: T) => expect(!!value).toBeTruthy();
}

export function Equals<T>(expected: T): (value: T) => void {
  return (value: T) => expect(value).toBe(expected);
}

export function StartsWith(prefix: string): (value: string) => void {
  return (value: string) => expect(value.startsWith(prefix)).toBeTruthy();
}

export function See<T>(question: Question<T>, expectation: (value: T) => void): { question: Question<T>; expect: (value: T) => void } {
  return { question, expect: expectation };
}
