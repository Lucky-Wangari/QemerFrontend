'use client'
import Bar from "../components/OverviewData";
import Image from "next/image";

const cards = [
  { name: 'Registered Children', href: '#', amount: '400' },
  { name: 'Eligible For Aid', href: '#', amount: '234' },
  { name: 'Active CHVS', href: '#', amount: '54' },
];

function Overview() {
  return (
    <div>
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    <div className="">
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-orange-500 sm:truncate sm:leading-9">
                      Masimba Analysis
                    </h1>
                    </div>
                    <div style={{marginLeft: '800px'}}>
                       <Image src="/person1 4.png" alt="Person Image" width={30} height={20} />
                     </div>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                      Hello, Qemer!
                    </dd>
                  
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {cards.map((card) => (
              <div key={card.name} className="h-[150px] overflow-hidden w-[350px] rounded-lg bg-white shadow-lg border border-orange-500">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 orange-border" />
                    <div className="w-0 flex-1">
                      <dl>
                        <dt className="truncate text-m font-medium text-gray-500 text-center text-xl">{card.name}</dt>
                        <dd>
                          <div className="text-4xl font-bold text-gray-900 text-center mt-7">{card.amount}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3" />
              </div>
            ))}
          </div>
        </div>
        <hr className="border-t-1 border-orange-500 my-5 w-[80%]" style={{ marginLeft: '97px' }} />
        <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
          Recent activity
        </h2>

        <div className="shadow sm:hidden">
          <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
            <Bar />
          </ul>
          <nav className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3" aria-label="Pagination">
            <div className="flex flex-1 justify-between">
              <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">
                Previous
              </a>
              <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">
                Next
              </a>
            </div>
          </nav>
        </div>

        <div className="hidden sm:block">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mt-2 flex flex-col">
              <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <div className="grid grid-cols-1 gap-4 h-[500px]">
                  <article>
                    <Bar />
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
