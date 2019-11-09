using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Muistipeli
{
    public partial class Form1 : Form
    {

        Random random = new Random();

        // Luodaan lista kuvioille
        List<string> kuvio = new List<string>()
    {
        "!", "!", "N", "N", ",", ",", "k", "k",
        "b", "b", "v", "v", "w", "w", "z", "z"
    };


        // Nämä pitävät kirjaa siitä mitä pelaaja klikkaa
        // alussa ne ovat null, sillä pelaaja ei ole klikannut mitään
        Label ekaKlikki = null;
        Label tokaKlikki = null;


        public Form1()
        {

            InitializeComponent();

            IkonitLaudalle();
        }
        private void IkonitLaudalle()
        {
            // Otetaan ikoni randomilla listasta
            // ja lisätään se labeliin
            foreach (Control control in tableLayoutPanel1.Controls)
            {
                Label iconLabel = control as Label;
                if (iconLabel != null)
                {

                    int randomNumber = random.Next(kuvio.Count);
                    iconLabel.Text = kuvio[randomNumber];

                    // Muutetaan ikonin väri
                    // samaksi kuin tausta
                    iconLabel.ForeColor = iconLabel.BackColor;

                    kuvio.RemoveAt(randomNumber);
                }
            }
        }

        private void label_Click(object sender, EventArgs e)
            // Hallitsee klikkaukset

        {
            Label clickedLabel = sender as Label;

            // Ignoraa klikkaukset jos timer on päällä
            if (timer1.Enabled == true)
                return;

            
            if (clickedLabel != null)
            {
                // Ignoraa klikin jos ikoni on jo näkyvissä
                if (clickedLabel.ForeColor == Color.Black)
                    return;

                // ekaKlikki muutetaan pelaajan klikkaamaksi ikoniksi ja 
                // muutetaan sen väri mustaksi.
                if (ekaKlikki == null)
                {
                    ekaKlikki = clickedLabel;
                    ekaKlikki.ForeColor = Color.Black;

                    return;
                }
                
                tokaKlikki = clickedLabel;
                tokaKlikki.ForeColor = Color.Black;

                // Tarkistaa onko pelaaja voittanut
                tarkistaVoitto();

                // Jättää parit näkyviin
                if (ekaKlikki.Text == tokaKlikki.Text)
                {
                    // Resettaa arvoiksi null, jotta pelaaja voi jatkaa
                    ekaKlikki = null;
                    tokaKlikki = null;
                    return;
                }

                // Aloittaa ajastimen
                timer1.Start();

            }
        }

        private void timer1_Tick(object sender, EventArgs e)
            // Ajastin alkaa kun pelaaja klikkaa
            // kahta ikonia jotka eivät ole parit.
            // Ajastin lastee 750ms
            // ja sen jälkeen piilottaa molemmat ikonit

        {

            timer1.Stop();

            // Piilottaa ikonit
            ekaKlikki.ForeColor = ekaKlikki.BackColor;
            tokaKlikki.ForeColor = tokaKlikki.BackColor;

            // Resettaa näiden arvoksi null
            // jotta pelaaja voi yrittää uudelleen
            ekaKlikki = null;
            tokaKlikki = null;

        }
        private void tarkistaVoitto()
        {
            // Tarkistaa, onko ikonille löytynyt pari
            // vertaamalla sen väriä taustaväriin.
            
            foreach (Control control in tableLayoutPanel1.Controls)
            {
                Label iconLabel = control as Label;

                if (iconLabel != null)
                {
                    if (iconLabel.ForeColor == iconLabel.BackColor)
                        return;
                }
            }

            // Jos kaikki parit on löydetty, tulostetaan seuraava teksti
            MessageBox.Show("Löysit kaikki parit!", "Onnittelut");
            Close();
        }
    }
}
