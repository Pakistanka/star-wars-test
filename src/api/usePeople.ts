import { useQuery } from '@tanstack/react-query';

import { httpClient } from './httpClient';
import { PeopleResponse } from './types';

export const usePeople = (search: string, page: number) => {
  return useQuery<PeopleResponse>({
    queryKey: ['people', search, page],
    queryFn: async () => {
      const response = await httpClient.get('/people/', {
        params: {
          search,
          page,
        },
      });

      return response.data;
    },
  });
};
