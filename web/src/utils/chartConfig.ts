interface SeriesProps<T> {
    name: string;
    data: T
}

export function createOptions<T>(data: T): ApexCharts.ApexOptions {
    const options: ApexCharts.ApexOptions = {
        xaxis: {
            categories: data,
        },
        yaxis: {
            tooltip: {
            enabled: true,
            },
        },
    }

    return options
}


export function createSeries<T>(data: T, name: string): SeriesProps<T>[] {
    const series = [
        {
            name,
            data
        }
    ]

    return series
}

