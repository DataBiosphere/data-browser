FROM trion/ng-cli-karma

## Install Python
WORKDIR python-build
RUN apt update
RUN apt-get install zlib1g-dev
RUN apt -y install software-properties-common
RUN curl -O https://www.python.org/ftp/python/3.8.2/Python-3.8.2.tar.xz
RUN tar -xf Python-3.8.2.tar.xz
WORKDIR Python-3.8.2
RUN ./configure --enable-optimizations
RUN make -j 8
RUN make install
WORKDIR app

