import Papa from 'papaparse';

export const exportToCsv = (data, filename = 'export.csv') => {
        // Preprocess data to modify survey_id by prepending a URL
    // const modifiedData = data.map(item => ({
    //     ...item,
    //     url: `${process.env.REACT_APP_SURVEY_PAGE_URL}${projectName}/${item.survey_id}`, // Modify the survey_id attribute
    //     number_of_items: item.survey_items.length
    // }));

    // Use Papa Parse to convert the data to CSV
    const csv = Papa.unparse({
        data: data,
        // fields: fields, // Specify fields to include in the CSV
    });

    // Create a Blob and trigger the download as before
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
