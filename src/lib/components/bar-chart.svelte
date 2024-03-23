<script lang="ts">
    import { Bar } from "svelte-chartjs"

    import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"
    import annotationPlugin from "chartjs-plugin-annotation"
    import type { Plugin } from "chart.js"
    import { onMount } from "svelte"

    Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, annotationPlugin)

    const dottedBackgroundPlugin: Plugin<"bar"> = {
        id: "dottedBackground",
        beforeDraw: (chart) => {
            const { ctx } = chart
            ctx.save()
            ctx.globalCompositeOperation = "destination-over"
            ctx.fillStyle = "#e5e5e5"
            for (let y = 0; y < chart.height; y += 8) {
                for (let x = 0; x < chart.width; x += 8) {
                    ctx.beginPath()
                    ctx.arc(x, y, 1, 0, 2 * Math.PI)
                    ctx.fill()
                }
            }
            ctx.restore()
        },
    }

    let chart: Chart<"bar", (number | [number, number])[], unknown>
    onMount(() => {
        document.fonts.ready.then(() => {
            chart.update()
        })
    })

    export let line
    export let data
</script>

<Bar
    bind:chart
    {data}
    options={{
        responsive: true,
        layout: {
            padding: {
                top: 42,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        plugins: {
            tooltip: {
                backgroundColor: "#ffffff",
                borderColor: "#e5e5e5",
                borderWidth: 1,
                titleColor: "#000",
                bodyColor: "#262626",
                bodyFont: {
                    family: "Inter",
                },
                titleFont: {
                    family: "Inter",
                },
            },
            annotation: {
                annotations: {
                    goal: {
                        type: "line",
                        yMin: line,
                        yMax: line,
                        borderColor: "#171717",
                        borderWidth: 2,
                        borderDash: [10, 10],
                        label: {
                            content: "Цель",
                            display: true,
                            backgroundColor: "#0a0a0a",
                            borderColor: "#171717",
                            borderWidth: 1,
                            color: "#ffffff",
                            font: {
                                family: "Inter",
                            },
                        },
                    },
                },
            },
            legend: {
                labels: {
                    font: {
                        family: "Inter",
                    },
                },
            },
        },
        datasets: {
            bar: {
                backgroundColor: "#2563eb",
                hoverBackgroundColor: "#1d4ed8",
                borderRadius: 4,
            },
        },
    }}
    plugins={[dottedBackgroundPlugin]}
    class="rounded-md border border-neutral-200 w-full"
/>
