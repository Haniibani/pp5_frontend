import { axiosReq } from "../clients/axios";

const fetchMoreData = async (resource, setResource) => {
  try {
    // Fetch data from the 'next' URL
    const { data } = await axiosReq.get(resource.next);

    // Update the 'resource' state
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        // Check if the current result already exists in 'results'
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur]; // Add the current result to 'results' if it's unique
      }, prevResource.results),
    }));
  } catch (err) {
    // Handle errors if necessary
  }
};

export default fetchMoreData;
