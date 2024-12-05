export interface IPagination {
  result: any[];
  metaData: {
    currentPage: number;
    firstPage: number;
    lastPage: number;
    nextPage: number;
    pageSize: number;
    previousPage: number;
    totalRecords: number;
    totalPages: number;
  };
}

class PaginationFormat {
  public create(
    data: any[] = [],
    total: number = 0,
    currentPage: number = 0,
    limit: number = 10,
  ): IPagination {
    currentPage = +currentPage;
    limit = +limit;

    const totalPages = Math.ceil(total / limit);
    const nextPage: number = +currentPage + 1;
    const previousPage: number = +currentPage - 1;

    const currentPageNo = +currentPage;
    const no = (currentPageNo - 1) * limit;
    let startNo = no || 1;
    if (Array.isArray(data)) {
      data.map((item) => {
        item.no = startNo++;
        return item;
      });
    }
    return {
      result: data,
      metaData: {
        currentPage,
        firstPage: total ? 1 : 0,
        lastPage: totalPages,
        nextPage: nextPage > totalPages ? currentPage : nextPage,
        pageSize: limit,
        previousPage: previousPage < 1 ? currentPage : previousPage,
        totalRecords: total,
        totalPages: totalPages,
      },
    };
  }
}

export const Pagination = new PaginationFormat();
