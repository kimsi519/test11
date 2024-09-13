Array.prototype.sortBy = function (sortProp = '') {
    const sortArray = sortProp.split(',');

    // 각 기준을 [sortKey, order] 형태로 변환
    const sortPairs = sortArray.map(value => {
        const [sortKey, order] = value.split(':');
        return [sortKey, order || 'asc']; // order가 비어있을 경우 기본값 'asc'로 설정
    });

    return this.slice().sort((a, b) => {
        for (const [sortKey, order] of sortPairs) {
            if (a[sortKey] > b[sortKey]) return order === 'desc' ? -1 : 1;
            if (a[sortKey] < b[sortKey]) return order === 'desc' ? 1 : -1;
        }
        return 0;
    });
};