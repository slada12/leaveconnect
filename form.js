async function submitForm() {

    const btn = document.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerText = "Sending...";

    // Collect all form data
    const fname = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const officer = document.getElementById("officer").value;
    const snumber = document.getElementById("snumber").value;
    const duration = document.querySelector("select[name='duration']").value;
    const message = document.getElementById("message").value;
    const rand1 = document.querySelector("input[name='rand1']").value;
    const rand2 = document.querySelector("input[name='rand2']").value;

    // Verification check
    if (rand2 !== rand1) {
        alert("Verification code incorrect!");
        btn.disabled = false;
        btn.innerText = "Request Now";
        return;
    }


    // Prepare data for EmailJS
    const data = {
        service_id: 'service_gtoqotf',   // e.g. 'service_f7hxsgn'
        template_id: 'template_aa3un6o', // e.g. 'template_fp6mkgr'
        user_id: 'RZZIdLLLZ_-JJSI0z',      // e.g. 'bId3yMIgrFpkRm56z'
        template_params: {
            to_name: 'Leave Request',
            to_email: 'leave-support@leaveconnect.site',
            from_name: fname,
            from_email: email,
            officer,
            snumber,
            duration,
            reason: message
        },
    };

    // Send the email via EmailJS API
    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const contentType = response.headers.get('content-type');
        const result = contentType && contentType.includes('application/json')
            ? await response.json()
            : await response.text();

        console.log('EmailJS Response:', result);
        alert("✅ Leave request sent successfully!");
        // e.target.reset();
    } catch (error) {
        console.error('Error sending email:', error);
        alert("❌ Failed to send request. Please try again.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Request Now";
    }
};


window.submitForm = submitForm;