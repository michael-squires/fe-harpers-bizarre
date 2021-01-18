export const formatDate = ({ created_at, ...otherProperties }) => {
    const readableDate = created_at.slice(0, 10) + ' ' + created_at.slice(11, 19)
    return { created_at: readableDate, ...otherProperties }
};
