import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import menu2 from "../../src/assets/menuitems/menu2.png";
import axios from "axios";

export const RecentMenuDetails = () => {
  const [categoryMenuDetails, setCategoryMenuDetails] = useState(null);
  const [loading, setLoading] = useState(true); 
  const location = useLocation();
  const recentList = location.state?.categoryDetails;
  const menuid = recentList?.menuId;
  const categoryId = recentList?.clientId;

  const storedClientId = localStorage.getItem("clientId");

  useEffect(() => {
    if (menuid && categoryId) {
      fetchCatMenuDetails();
    }
  }, [menuid, categoryId]);

  const fetchCatMenuDetails = async () => {
    try {
      const response = await axios.get(
        `https://viamenu.oa.r.appspot.com/viamenu/clients/${storedClientId}/menus/${recentList?.menuId}/categories/${recentList?.categoryId}/items/${recentList?.itemId}`
      );
      setCategoryMenuDetails(response?.data?.data);
    } catch (error) {
      console.error("Error fetching menu details:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            minHeight: "300px",
          }}
        >
          <CircularProgress sx={{ color: "#96FF7C" }} />
          <Typography variant="h6" sx={{ color: "white", marginLeft: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : categoryMenuDetails ? (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="div"
              color="white"
              fontWeight="bold"
              sx={{ flexGrow: 1 }}
            >
              {categoryMenuDetails?.mainItemText || categoryMenuDetails?.category}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <img
              src={categoryMenuDetails?.imageUrl || menu2}
              alt={categoryMenuDetails?.title || "Dish Image"}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <Typography
          variant="h6"
          sx={{ color: "white", textAlign: "center", marginTop: "20px" }}
        >
          No menu details found
        </Typography>
      )}

      {categoryMenuDetails && (
        <Box
          sx={{
            flexGrow: 1,
            padding: 3,
            marginTop: 1,
            border: "1px solid #90BE6D",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#1F1D2B",
              padding: 2,
              borderRadius: 2,
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>Dish</Typography>
                  <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
                    Price
                  </Typography>
                  <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
                    Category
                  </Typography>
                  <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
                    Menu Name
                  </Typography>
                  <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
                    Allergens
                  </Typography>
                  <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>
                    Description
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={9}>
                <Box>
                  <Typography sx={{ color: "#90BE6D", fontWeight: "bold" }}>
                    {categoryMenuDetails?.mainItemText ||
                      categoryMenuDetails?.category ||
                      "N/A"}
                  </Typography>
                  <Typography
                    sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}
                  >
                    {categoryMenuDetails?.price || "N/A"} $
                  </Typography>
                  <Typography
                    sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}
                  >
                    {categoryMenuDetails?.category || "N/A"}
                  </Typography>
                  <Typography
                    sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}
                  >
                    {categoryMenuDetails?.menu_item || "N/A"}
                  </Typography>
                  <Typography
                    sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}
                  >
                    {categoryMenuDetails?.allergens || "N/A"}
                  </Typography>
                  <Typography
                    sx={{ marginTop: 2, color: "#90BE6D", fontWeight: "bold" }}
                  >
                    {categoryMenuDetails?.itemDescription || "N/A"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RecentMenuDetails;
