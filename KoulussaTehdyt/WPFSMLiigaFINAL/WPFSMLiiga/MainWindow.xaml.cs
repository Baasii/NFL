using System;
using System.Windows;
using System.Windows.Controls;
using System.Xml;

namespace WPFSMLiiga
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        int kotimaalit = 0;
        int vierasmaalit = 0;
        int[] kMaalinTekijä = new int[20];
        int[] vMaalinTekijä = new int[20];
        string[] kPelaaja = new string[100];
        string[] vPelaaja = new string[100];

        private void Window_Activated(object sender, EventArgs e)
        {   // Tämä tapahtuu ohjelman alussa ...

            // nollaa maalintekijätaulukot
            for (int i = 0; i < 20; i++ )
            {
                kMaalinTekijä[i] = 0;
                vMaalinTekijä[i] = 0;
            }
            tyhjääPelaajaTaulukko("K");
            tyhjääPelaajaTaulukko("V");
            lisääJoukkueetListaLaatikkoon();
        }
        void tyhjääPelaajaTaulukko(string joukkueTyyppi)
        {
            if (joukkueTyyppi == "K")
            {
                // tyhjää kPelaaja taulukko laittamalla jokaiseen alkioon tyhjä merkkijono ""
                for (int i = 0; i < 100; i++)
                {
                    kPelaaja[i] = "";                    
                }
            }
            else
            {
                // tyhjää vPelaaja taulukko laittamalla jokaiseen alkioon tyhjä merkkijono ""
                for (int i = 0; i < 100; i++)
                {
                    vPelaaja[i] = "";
                }
            }

        }


        void lisääJoukkueetListaLaatikkoon()
        {
            XmlReader lukija = XmlReader.Create("SMLiiga.xml");
            
            string joukkue = string.Empty;
            lukija.MoveToContent();

            // XML-tiedostossa on Joukkue-elementin sisällä attribuuttina joukkueen nimi.
            // Attribuutin nimi on nimi; <Joukkue nimi = "Sport">
            // Attribuutti luetaan komennolla lukija.GetAttribute("nimi");

            while (lukija.Read())
            {
                if (lukija.NodeType == XmlNodeType.Element &&
                    lukija.Name == "Joukkue")
                {
                    if (lukija.HasAttributes)
                    {
                        joukkue = lukija.GetAttribute("nimi");
                        lstKotijoukkue.Items.Add(joukkue);
                        lstVierasjoukkue.Items.Add(joukkue);
                    }
                }
            }
            lstVierasjoukkue.SelectedIndex = 0;
            lstKotijoukkue.SelectedIndex = 1;
            return;
        }

        void joukkueenVaihtuessaTyhjätäänTiedot()
        {
            vierasmaalit = 0;
            kotimaalit = 0;
            lblTulos.Content = "";
            txtKotimaalit.Text = "0";
            txtVierasmaalit.Text = "0";
            lstKotiMaalit.Items.Clear();
            lstVierasMaalit.Items.Clear();
            
        }
        private void lstKotijoukkue_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            lstKPelaajat.Items.Clear();
            
            tyhjääPelaajaTaulukko("K");
            joukkueenVaihtuessaTyhjätäänTiedot();

            string joukkue = lstKotijoukkue.SelectedItem.ToString();
            lblKotijoukkue.Content = joukkue;
            Boolean onkohanKotijoukkue = true;
            HaePelaajatArrayTaulukkoon(joukkue, onkohanKotijoukkue);
        }
        void HaePelaajatArrayTaulukkoon(string joukkue, Boolean onkoKotijoukkue)
        {
            // tyhjää varmuuden vuosi vanhat tiedot kPelaaja ja vPelaaja-arraytaulukoista

            string sukunimi = "", pelNro = "", tiedostonJoukkue = "";
            // luodaan uusi yhteys XML-tiedostoon ja haetaan valitun joukkueen pelaajat 
            XmlReader lukija = XmlReader.Create("SMLiiga.xml");
            lukija.MoveToContent();
            Boolean joukkueenPelaajiaRiittää = true;
            // toistetaan niin kauan kuin tietoja riittää ja haetun joukkueen pelaajia riittää
            while (lukija.Read() && joukkueenPelaajiaRiittää==true)
            {
                if (lukija.NodeType==XmlNodeType.Element && lukija.Name== "Joukkue")
                {
                    if (lukija.HasAttributes)
                    {
                        tiedostonJoukkue = lukija.GetAttribute("nimi");
                        if (tiedostonJoukkue == joukkue)
                        { 
                            // nyt on löytynyt etsittävä joukkue ja luetaan sen kaikki pelaajat
                            while (lukija.Read())
                            { 
                                // tarkistetaan, onko kaikki pelaajat jo luettu
                                if (lukija.NodeType==XmlNodeType.EndElement && lukija.Name== "Joukkue")
                                {
                                    joukkueenPelaajiaRiittää = false;
                                    break;
                                }
                                if (lukija.NodeType==XmlNodeType.Element && lukija.Name== "sukunimi")
                                {
                                    sukunimi = lukija.ReadString();
                                }
                                // 
                                if (lukija.NodeType==XmlNodeType.Element && lukija.Name== "pelNro")
                                {
                                    pelNro = lukija.ReadString();
                                    int iPelNro = int.Parse(pelNro);

                                    //// nyt on luettu XML-tiedostosta pelaajan sukunimi ja pelaajanumero
                                    //// taulukkoon kPelaaja ja vPelaaja sijoitetaan pelinumeron kohdalle pelaajan sukunimi 
                                    //// taulukon lisäksi pelaajan numero ja nimi sijoitetaan listalaatikkoon
                                    
                                    if (onkoKotijoukkue == true)
                                    {
                                        kPelaaja[iPelNro] = sukunimi;
                                        lstKPelaajat.Items.Add(pelNro + " " + sukunimi);
                                    }
                                    else
                                    {
                                        vPelaaja[iPelNro] = sukunimi;
                                        lstVPelaajat.Items.Add(pelNro + " " + sukunimi);
                                    }
                                }

                            }
                        }
                    }

                }
            }
          }

        private void lstVierasjoukkue_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            lstVPelaajat.Items.Clear();
            tyhjääPelaajaTaulukko("V");
            joukkueenVaihtuessaTyhjätäänTiedot();

            string joukkue = lstVierasjoukkue.SelectedItem.ToString();
            lblVierasjoukkue.Content = joukkue;
            Boolean onkohanKotijoukkue = false;
            HaePelaajatArrayTaulukkoon(joukkue, onkohanKotijoukkue);
        }

      

        private void btnKirjaaKotimaali_Click(object sender, RoutedEventArgs e)
        {
            // haetaan tämän hetken päiväys ja kellonaika
            DateTime maalinTekoHetki = DateTime.Now;

            /*
             * kirjaa kotimaali listalaatikon tiedoksi
             * lisää kotimaalit-muuttujan sisältöä yhdellä
             * laita tulos alalaidan otsikkolaatikkoon
             * 
             * */
            lstKotiMaalit.Items.Add(maalinTekoHetki.ToLongTimeString() + ", " + lstKPelaajat.SelectedItem.ToString());
            kotimaalit++;
            txtKotimaalit.Text = kotimaalit.ToString();
            lblTulos.Content = lblKotijoukkue.Content + "-" + lblVierasjoukkue.Content + " " + txtKotimaalit.Text + "-" + txtVierasmaalit.Text;
        }

        private void btnKirjaaVierasmaali_Click(object sender, RoutedEventArgs e)
        {
            DateTime maalinTekoHetki = DateTime.Now;

            lstVierasMaalit.Items.Add(maalinTekoHetki.ToLongTimeString() + ", " + lstVPelaajat.SelectedItem.ToString());
            vierasmaalit++;
            txtVierasmaalit.Text = vierasmaalit.ToString();
            lblTulos.Content = lblKotijoukkue.Content + "-" + lblVierasjoukkue.Content + " " + txtKotimaalit.Text + "-" + txtVierasmaalit.Text;

        }
    }
}
