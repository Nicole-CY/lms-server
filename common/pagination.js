function getPagination(query, defaultPage = 1, defaultPageSize = 10){
    const page = parseInt(query.page, 10) || defaultPage;
    const pageSize = parseInt(query.pageSize, 10) || defaultPageSize;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    return {page, pageSize, offset, limit};
}

module.exports = {getPagination};