import React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Typography } from '@mui/material';
import StockImage from '../../assets/images/image_stock.png';
import { useTheme } from '../../contexts/themeContext';
import CustomTitle from 'components/titles/CustomTitle';

const HomePage: React.FC = () => {
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#232876' },
      background: { paper: darkMode ? '#333' : '#F2F2F2', default: darkMode ? '#121212' : '#fff' },
      text: { primary: darkMode ? '#fff' : '#000' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ textAlign: 'center', padding: 3 }}>
        <CustomTitle>
          Bienvenue sur E-Stock !
        </CustomTitle>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Vous trouverez ci-desssous un bouton vous redirigeant sur le lien de téléchargement du client Lourd (Version Windows Uniquement).<br />
          Sinon, vous pouvez accéder à la version web depuis la sidebar</Typography>

        <img src={StockImage} alt="Stock" style={{ minWidth: '35%', width:'100%', maxWidth:'650px', height: 'auto', marginTop: '-50px' }} />

        </Box>

        <Box sx={{ marginTop: -10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button 
            href="https://drive.google.com/uc?id=1TYr3WNeC73p1dmSsvWq06cabi4SlB51H" 
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#1423DC',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#96CD32',
              },
            }}
            download
                  >
            Télécharger le Client Lourd
          </Button>
       </Box> 
    </ThemeProvider>
  );
};

export default HomePage;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { CssBaseline, ThemeProvider, createTheme, Button, Box, Typography } from '@mui/material';
// import StockImage from '../../assets/images/image_stock.png';
// import { useTheme } from '../../contexts/themeContext';
// import CustomTitle from 'components/titles/CustomTitle';
// import SuperuserGuard from '../../guards/SuperuserGuard';

// const HomePage: React.FC = () => {
//   const { darkMode } = useTheme();

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? 'dark' : 'light',
//       primary: { main: '#232876' },
//       background: { paper: darkMode ? '#333' : '#F2F2F2', default: darkMode ? '#121212' : '#fff' },
//       text: { primary: darkMode ? '#fff' : '#000' },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ textAlign: 'center', padding: 3 }}>
//         <CustomTitle>
//           Bienvenue sur E-Stock !
//         </CustomTitle>
//         <img src={StockImage} alt="Stock" style={{ minWidth: '45%', width:'100%', maxWidth:'700px', height: 'auto' }} />
//         <Box sx={{ marginTop: 3, display: 'flex', alignItems:'center', justifyContent:'space-evenly'}}>

//           <Button component={Link} to="/stock" variant="contained" color="primary">
//             Voir le stock
//           </Button>
          
//           <SuperuserGuard>

//             <Button component={Link} to="/category" variant="contained" color="primary">
//               Voir les catégories
//             </Button>

//             <Button component={Link} to="/product" variant="contained" color="primary">
//               Voir les produits
//             </Button>

//           </SuperuserGuard>

//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default HomePage;
