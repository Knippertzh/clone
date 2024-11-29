import { Record } from '../types';
import { companies } from '../data/companies';

export const getAllRecords = (): Record[] => {
  return companies;
};

export const getRecordById = (id: string): Record | undefined => {
  return companies.find(record => record.id === id);
};

export const addRecord = (record: Record): void => {
  companies.push(record);
};

export const updateRecord = (id: string, updates: Partial<Record>): void => {
  const index = companies.findIndex(record => record.id === id);
  if (index !== -1) {
    companies[index] = { ...companies[index], ...updates };
  }
};

export const generateNewId = (): string => {
  const lastId = companies[companies.length - 1]?.id || 'CORP-0000';
  const lastNumber = parseInt(lastId.split('-')[1]);
  return `CORP-${String(lastNumber + 1).padStart(4, '0')}`;
};