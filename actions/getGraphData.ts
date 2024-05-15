import moment from "moment";

export default async function getGraphData() {
  try {
    // Get the start & end dates for the data range (7 days ago to today)
    const startData = moment().subtract(6, "days").startOf("day");
    const endData = moment().endOf("day");

    // Query the database to get order data grouped by created date
    const result = await prisma?.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startData.toISOString(),
          lte: endData.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    // Initialize an object to aggregate the data by day
    const aggregateData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    // Create a clone of the start date to iterate over each day
    const currentDate = startData.clone();

    // iterate over each day in the data range
    while (currentDate <= endData) {
      const day = currentDate.format("dddd");
      aggregateData[day] = {
        day,
        date: currentDate.format("DD-MM-YYYY"),
        totalAmount: 0,
      };
      currentDate.add(1, "day");
    }

    // Calculate the total amount by each day by summing the total amount
    result?.forEach((entry) => {
      const day = moment(entry.createdAt).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregateData[day].totalAmount += amount;
    });

    // Convert the aggregateData Object to array and sort it by date
    const formatedData = Object.values(aggregateData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    // return the formated data
    return formatedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
