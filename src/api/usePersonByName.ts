import { useQuery } from '@tanstack/react-query';

import { httpClient } from './httpClient';
import { PeopleResponse, Person } from './types';

export const usePersonByName = (name?: string) => {
  return useQuery<Person | null>({
    queryKey: ['person', name],
    enabled: !!name,
    queryFn: async () => {
      const response = await httpClient.get<PeopleResponse>('/people/', {
        params: { search: name },
      });

      const found = response.data.results.find((p) => p.name === decodeURIComponent(name!));

      if (!found) return null;

      return found;
    },
  });
};
