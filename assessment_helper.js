  // Firebase Configuration and Initialization (SAME as in dashboard.html)
 const firebaseConfig = {
        apiKey: "AIzaSyDFAh_QfHaQqXIna07yHuHzN6EW4mGCtUE",
        authDomain: "chartme-2c4aa.firebaseapp.com",
        projectId: "chartme-2c4aa",
        storageBucket: "chartme-2c4aa.firebasestorage.app",
        messagingSenderId: "1000796548418",
        appId: "1:1000796548418:web:c891c61205cdf404f1ecdb",
        measurementId: "G-T2686T1ETY"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

   function translateResultInterpretation(resultInterpretation) {
        switch (resultInterpretation) {
           case 'excellent':
              return  'Excelente';
               break;
            case 'good':
              return  'Bom';
               break;
            case 'average':
              return  'Oportunidades de Melhoria';
               break;
            case 'bad':
             return   'Necessário Investir Intensamente';
              break;
             default:
              return  'Não Disponível';
    }
}

     async function loadAssessmentDetails(assessmentId) {
            try {
                 showLoading();
                 loadingMessage.innerText = "Loading Assessment Details...";
                const docRef = db.collection("assessmentHistory").doc(assessmentId);
                const doc = await docRef.get();

                if (doc.exists) {
                     hideLoading();
                    const assessment = doc.data();
                   return assessment; // Return assessment data for PDF generation

                } else {
                    document.getElementById('section-results').innerText = 'Assessment not found.';
                }
            } catch (error) {
                console.error("Error loading assessment details:", error);
                document.getElementById('section-results').innerText = 'Error loading assessment details.';
            } finally {
                hideLoading();
            }
         return null;
        }
    async function shareOnWhatsApp(assessment) {
    const message = `Olá! Acabei de fazer um teste de Inner Networking incrível e olha só o resultado:  IMP - Índice de Magnetismo Pessoal. \n\n ${assessment.result} pontos \n ${translateResultInterpretation(assessment.resultInterpretation)}. \n\n Veja meus resultados completos em ${window.location.href}.`;
    const encodedMessage = encodeURIComponent(message);


    try {
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        console.error("Error sharing:", error);
        alert("Error sharing. Please try again.");  // Optional user message
    }
}