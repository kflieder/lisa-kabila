import React from 'react'

function SocialLinks() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white pt-2 p-4 shadow-sm w-76 flex justify-around items-center flex-col">
        
            <h2 className="text-lg mb-1 font-semibold text-gray-900">Connect with us</h2>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
           

            <div className="flex flex-wrap items-center gap-2">
                <a
                    href="https://www.facebook.com/abrazo.artesanal"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Facebook"
                    className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition"
                >
                    <span
                        aria-hidden="true"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600/10 text-blue-700"
                    >
                       <img src="/facebook.png" alt="Facebook" className="h-6 w-6" />
                    </span>
                    <span>Facebook</span>
                </a>

                <a
                    href="https://wa.me/+529996039795"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact us on WhatsApp"
                    className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100 hover:border-green-300 transition"
                >
                    <span
                        aria-hidden="true"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-green-600/10 text-green-700"
                    >
                        {/* Replace with WhatsApp icon */}
                        <img src="/whatsapp.png" alt="WhatsApp" className="h-6 w-6" />
                    </span>
                    <span>WhatsApp</span>
                </a>
            </div>
        </div>
    </div>
  )
}

export default SocialLinks
