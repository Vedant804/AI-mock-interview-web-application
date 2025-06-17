import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section */}
        <section className="relative flex h-48 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Mock Interview"
            src="https://img.freepik.com/free-vector/man-having-online-job-interview_52683-43379.jpg?size=626&ext=jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12 z-10">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <svg className="h-8 sm:h-10" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424..." fill="currentColor" />
              </svg>
            </a>
            
          </div>
        </section>

        {/* Right Section */}
        <main className="flex items-center justify-center px-8 py-12 sm:px-12 lg:col-span-7 lg:px-16 lg:py-16 xl:col-span-6 bg-gray-100">
          <div className="max-w-xl lg:max-w-3xl">
            {/* Mobile Logo */}
            <div className="relative block lg:hidden">
              <a className="inline-flex items-center justify-center rounded-full bg-white text-blue-600 shadow-lg p-4" href="#">
                <span className="sr-only">Home</span>
                <svg className="h-8 sm:h-10" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424..." fill="currentColor" />
                </svg>
              </a>
            </div>

            {/* Sign In */}
            <div className="mt-12">
              <SignIn />
            </div>

            {/* Welcome Message */}
            <div className="mt-8 text-center lg:hidden">
              
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
