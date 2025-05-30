FROM public.ecr.aws/lambda/python:3.10

# Copy function code
COPY handler.py ./
COPY requirements.txt ./

# Install dependencies, no cache. I hate building on ARM made me install the wrong pydantic
RUN pip install --only-binary=:all: --platform manylinux2014_x86_64 --no-cache-dir  -r requirements.txt -t .

# Pydantic is being weird, so will try installing it all by itself
RUN pip install \
--platform manylinux2014_x86_64 \  
-t . \  
--implementation cp \  
--python-version 3.10 \  
--only-binary=:all: \  
--upgrade pydantic

# Set the Lambda handler
CMD ["handler.lambda_handler"]
