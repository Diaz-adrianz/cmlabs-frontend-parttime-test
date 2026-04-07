import { ActionResponse } from '@/types/action.type';
import { NextResponse } from 'next/server';

function errorResponseCore(err: any) {
  let status = 500,
    message = 'Internal Server Error';

  if (process.env.NODE_ENV == 'development') console.log(err);

  // handle any server errors here whether it is Server Actions or Api
  if (err.name == 'ValidationError') {
    status = 422;
    message = 'ValidationFailed';
  }

  return { status, message };
}

function errorResponseApi(err: any) {
  const { status, message } = errorResponseCore(err);

  return NextResponse.json({ message }, { status });
}

function errorResponseAction(err: any): ActionResponse<null> {
  const { message } = errorResponseCore(err);

  return { status: false, message, data: null };
}

export { errorResponseApi, errorResponseAction };
