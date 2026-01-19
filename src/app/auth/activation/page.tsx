import AuthLayout from "@/src/components/layouts/AuthLayout";
import Activation from "@/src/components/views/Auth/Activation";
import AuthService from "@/src/services/auth.service";

interface PageProps {
  searchParams: {
    code?: string;
  };
}

const ActivationPage = async ({ searchParams }: PageProps) => {
  let status: "success" | "failed" = "failed";

  if (searchParams.code) {
    try {
      const result = await AuthService.activation({
        code: searchParams.code,
      });

      if (result.data.data) {
        status = "success";
      }
    } catch {
      status = "failed";
    }
  }

  return (
    <AuthLayout>
      <Activation status={status} />
    </AuthLayout>
  );
};

export default ActivationPage;