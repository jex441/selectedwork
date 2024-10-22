import React from 'react';

export default function menuItem() {
  return (
    <div className="flex flex flex-row items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-500 transition-all hover:bg-stone-200 hover:text-gray-900 active:text-stone-200 dark:text-gray-400 dark:hover:text-gray-50">
      <span className="flex flex-row gap-3">
        <Newspaper className="h-4 w-4" />

        <Link onClick={() => toggleNav()} href="/news">
          News
        </Link>
      </span>
      <span>
        {user.news.visibility ? (
          <EyeOffIcon
            onClick={() => togglePageVisibilityHandler('news', false)}
            className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
          />
        ) : (
          <Eye
            onClick={() => togglePageVisibilityHandler('news', true)}
            className="h-4 w-4 cursor-pointer opacity-60 transition-all hover:opacity-100"
          />
        )}
      </span>
    </div>
  );
}
