const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createFundraiserRequest = async (
  firstName,
  lastName,
  email,
  title,
  details,
  imageName,
  documentName,
  amountNeeded,
  userId
) => {
  return await prisma.pendingRequests.create({
    data: {
      firstName,
      lastName,
      email,
      title,
      details,
      imageName,
      documentName,
      amountNeeded: parseInt(amountNeeded),
      userId,
    },
  });
};

const deleteFundraiserRequest = async (id) => {
  await prisma.pendingRequests.delete({
    where: { id },
  });
};

const getFundraiserRequests = async () => {
  return await prisma.pendingRequests.findMany();
};

const getApprovedFundraisers = async () => {
  return await prisma.processedRequests.findMany({
    where: {
      status: "Approved",
    },
  });
};

const getFundraiserRequest = async (id) => {
  return await prisma.pendingRequests.findUnique({
    where: { id },
  });
};

const approveFundraiser = async (processedRequestData, id) => {
  console.log(processedRequestData);
  const processedRequest = await prisma.processedRequests.create({
    data: {
      ...processedRequestData,
      status: "Approved",
    },
  });

  await deleteFundraiserRequest(id);

  return processedRequest;
};

const rejectFundraiser = async (
  processedRequestData,
  imageName,
  documentName,
  id
) => {
  const processedRequest = await prisma.processedRequests.create({
    data: {
      ...processedRequestData,
      imageName,
      documentName,
      status: "Rejected",
    },
  });

  await deleteFundraiserRequest(id);

  return processedRequest;
};

const getFundraiser = async (id) => {
  return await prisma.processedRequests.findUnique({
    where: { id },
  });
};

module.exports = {
  createFundraiserRequest,
  getFundraiserRequests,
  getApprovedFundraisers,
  getFundraiserRequest,
  approveFundraiser,
  rejectFundraiser,
  deleteFundraiserRequest,
  getFundraiser,
};
