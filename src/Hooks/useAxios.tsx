import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import useHandleLogOut from "./useHandleLogOut";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINTS_BASE_URL,
});
interface fetcherFunctionProps {
  api: string;
  Session: string | null;
  lang: string;
  authorizedAPI?: boolean | undefined;
  addToken?: boolean;
  pageParam?: number;
  limit?: number;
  infiniteScroll?: boolean;
  paginationData?: boolean;
}

const fetcherFunction = async ({
  api,
  Session,
  lang,
  pageParam,
  limit,
  infiniteScroll,
  paginationData,
}: fetcherFunctionProps) => {
  const TempToken = Cookies.get("TT");

  const headers = Session
    ? {
        Authorization: `Bearer ${Session}`,
        "Content-Type": "application/json",
        "Accept-Language": lang,
        Platform: "website",
      }
    : TempToken
    ? {
        token: TempToken,
        "Content-Type": "application/json",
        "Accept-Language": lang,
        Platform: "website",
      }
    : {
        "Content-Type": "application/json",
        "Accept-Language": lang,
        Platform: "website",
      };
  const API = infiniteScroll
    ? `${api}page=${pageParam}&paginate=${limit}`
    : api;

  const res = await axiosInstance.get(API, {
    headers: headers,
  });

  return paginationData ? res.data?.data : res.data?.data;
};

export const useFetchData = (
  identifier: string,
  api: string,
  showToasts?: boolean,
  select?: boolean,
  id: string | number = "",
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  authorizedAPI?: boolean,
  onSuccess?: "" | ((data) => void),
  onError?: "" | (() => void),
  addToken: boolean = false
) => {
  const navigate = useNavigate();
  const [Session] = UseAuth();

  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [logOut] = useHandleLogOut();

  const useQueryOptions = {
    onSuccess: (data) => {
      showToasts && toast.success(data.message);
      onSuccess && onSuccess();
    },
    onError: (error) => {
      showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      error?.response?.status === 404 && navigate(`/${lang}/not-found`);
      if (authorizedAPI && error?.response?.status === 401) {
        navigate(`/${lang}/login`, { replace: true });
        logOut();
      }
    },
    select: (data) => {
      return select ? data[0] : data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
  };
  return useQuery({
    queryKey: [identifier, id],
    queryFn: () =>
      fetcherFunction({ api, authorizedAPI, Session, lang, addToken }),
    ...useQueryOptions,
  });
};
export const useFetchParallelData = (
  identifier: string,
  iterators: string[],
  api: string,
  showToasts?: boolean,
  select?: boolean,
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  authorizedAPI?: boolean,
  addToken: boolean = false
) => {
  const [Session] = UseAuth();

  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const useQueryOptions = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
  };

  return useQueries({
    queries: iterators.map((iterator) => {
      return {
        queryKey: [identifier, iterator],
        queryFn: () =>
          fetcherFunction({
            api: api + iterator,
            authorizedAPI,
            Session,
            lang,
            addToken,
          }),
        ...useQueryOptions,
      };
    }),
  });
};

export const useFetchPaginatedData = (
  identifier: string,
  id: string | number = "",
  api: string,
  showToasts = false,
  cacheTime = 500000,
  staleTime = 0,
  enabled = true,
  authorizedAPI = false,
  addToken: boolean = false,
  paginationData = true
) => {
  const [Session] = UseAuth();

  const navigate = useNavigate();
  const { i18n } = useTranslation("");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [logOut] = useHandleLogOut();

  const useFetchPaginatedDataOptions = {
    onSuccess: (data) => {
      showToasts && toast.success(data.message);
    },
    onError: (error) => {
      showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      if (authorizedAPI && error?.response?.status === 401) {
        navigate(`/${lang}/login`, { replace: true });
        logOut();
      }
    },
    select: (data) => {
      return data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    refetchOnReconnect: true,
    staleTime: staleTime,
    retry: 1,
    keepPreviousData: true,
  };

  return useQuery({
    queryKey: [identifier, id],
    queryFn: () =>
      fetcherFunction({
        api,
        authorizedAPI,
        Session,
        lang,
        addToken,
        paginationData,
      }),
    ...useFetchPaginatedDataOptions,
  });
};
export const useFetchInfiniteScrollData = (
  identifier: string,
  api: string,
  limit = 10,
  refetchOnMount = false,
  enabled = true,
  infiniteScroll = true,
  select?: boolean,
  showToasts?: boolean,
  id: string | number = "",
  cacheTime = 5000,
  staleTime = 0,
  onSuccess?: "" | ((data: any) => void),
  onError?: "" | (() => void)
) => {
  const navigate = useNavigate();
  const [Session] = UseAuth();

  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [logOut] = useHandleLogOut();

  const useQueryOptions = {
    onSuccess: (data) => {
      showToasts && toast.success(data.message);
      onSuccess && onSuccess();
    },
    onError: (error) => {
      showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      error?.response?.status === 404 && navigate(`/${lang}/not-found`);
      if (authorizedAPI && error?.response?.status === 401) {
        navigate(`/${lang}/login`, { replace: true });
        logOut();
      }
    },
    select: (data) => {
      return select ? data[0] : data;
    },
    refetchOnMount: refetchOnMount,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
  };
  return useInfiniteQuery({
    queryKey: [identifier],
    queryFn: ({ pageParam }) =>
      fetcherFunction({
        api,
        Session,
        lang,
        pageParam,
        limit,
        infiniteScroll,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (pages?.length < lastPage?.meta?.last_page) {
        return pages?.length + 1;
      } else return undefined;
    },
    ...useQueryOptions,
    initialPageParam: 1,
  });
};
export const usePostData = (
  showToasts = false,
  onSuccess?: (data?: any) => void,
  authorizedAPI?: boolean,
  onError?: (err: any) => void
) => {
  const [Session] = UseAuth();

  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  interface posterFunctionProps {
    api: string;
    data?: object;
    file?: boolean;
    method?: "POST" | "DELETE";
  }

  const posterFunction = async ({
    api,
    data,
    file,
    method = "POST",
  }: posterFunctionProps) => {
    const ContentType = file ? "multipart/form-data" : "application/json";
    const TempToken = Cookies.get("TT");

    const headers = Session
      ? {
          Authorization: `Bearer ${Session}`,
          "Content-Type": ContentType,
          "Accept-Language": lang,
          Platform: "website",
        }
      : TempToken
      ? {
          token: TempToken,
          "Content-Type": ContentType,
          "Accept-Language": lang,
          Platform: "website",
        }
      : {
          "Content-Type": ContentType,
          "Accept-Language": lang,
          Platform: "website",
        };

    const options = {
      url: api,
      method: method,
      headers: headers,
      data: data,
    };

    const res = await axiosInstance(options);
    return res.data;
  };
  const usePostDataOptions = {
    onSuccess: (data) => {
      showToasts && toast.success(data.message);
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      onError && onError(error);
      showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      authorizedAPI &&
        error?.response?.status === 401 &&
        navigate(`/${lang}/login`, { replace: true });
    },
  };
  const navigate = useNavigate();

  return useMutation({
    mutationFn: posterFunction,
    ...usePostDataOptions,
  });
};
